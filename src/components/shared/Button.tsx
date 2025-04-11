type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
    return <button className={`button-${variant} ${className ?? ''}`} {...props} />;
};
