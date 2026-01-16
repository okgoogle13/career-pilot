#!/bin/bash
# Claude Desktop Feedback Script
# Usage: ./scripts/request-changes.sh <component-name> <feedback-message>

set -e

COMPONENT_NAME=$1
FEEDBACK_MESSAGE=$2
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ -z "$COMPONENT_NAME" ] || [ -z "$FEEDBACK_MESSAGE" ]; then
  echo "Usage: ./scripts/request-changes.sh <component-name> <feedback-message>"
  echo "Example: ./scripts/request-changes.sh M3TextField 'Add missing ARIA labels'"
  exit 1
fi

# Get component from queue
COMPONENT=$(jq --arg name "$COMPONENT_NAME" '.queue[] | select(.name == $name)' .migration/queue.json)

if [ -z "$COMPONENT" ]; then
  echo "❌ Error: $COMPONENT_NAME not found in queue"
  exit 1
fi

# Add to feedback
echo "📝 Adding feedback for $COMPONENT_NAME..."
jq --arg name "$COMPONENT_NAME" \
   --arg feedback "$FEEDBACK_MESSAGE" \
   --arg timestamp "$TIMESTAMP" \
   --argjson component "$COMPONENT" \
   '.feedback += [{
     "component": $name,
     "componentPath": ($component.componentPath),
     "feedback": $feedback,
     "requestedAt": $timestamp,
     "status": "needs_changes"
   }]' .migration/feedback.json > .migration/feedback.tmp.json && \
   mv .migration/feedback.tmp.json .migration/feedback.json

# Remove from queue
jq --arg name "$COMPONENT_NAME" \
   '.queue = [.queue[] | select(.name != $name)]' \
   .migration/queue.json > .migration/queue.tmp.json && \
   mv .migration/queue.tmp.json .migration/queue.json

echo "📝 Feedback added for $COMPONENT_NAME"
echo "📊 Queue: $(jq '.queue | length' .migration/queue.json) components remaining"
echo "📝 Feedback: $(jq '.feedback | length' .migration/feedback.json) components need changes"
echo ""
echo "Antigravity should check: file://$(pwd)/.migration/feedback.json"
