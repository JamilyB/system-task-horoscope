export const Icon = ({ icon: IconComponent, className, ...props }) => (
  <IconComponent className={className} {...props} />
);