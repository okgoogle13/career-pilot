interface PageHeaderProps {
  title: string;
  highlightedWord?: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  highlightedWord,
  description,
  className = '',
}: PageHeaderProps) {
  const renderTitle = () => {
    if (!highlightedWord) {
      return <span>{title}</span>;
    }

    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-primary italic font-light">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`mb-8 ${className}`}>
      <h2
        className="mb-2 text-display-large leading-tight text-on-surface uppercase tracking-tight"
        style={{
          fontWeight: 'var(--sys-type-weight-display)',
          fontVariationSettings: "var(--sys-type-axes-authoritative)",
          transition: 'font-variation-settings var(--sys-motion-duration-medium-2) var(--sys-motion-easing-expressive-spring)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.fontVariationSettings = "'wght' 800, 'wdth' 120, 'XTRA' 468, 'GRAD' 150, 'opsz' 48";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.fontVariationSettings = "var(--sys-type-axes-authoritative)";
        }}
      >
        {renderTitle()}
      </h2>
      {description && <p className="text-on-surface-variant text-body-large">{description}</p>}
    </div>
  );
}
