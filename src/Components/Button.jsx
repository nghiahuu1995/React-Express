function Button({ color, children, ...props })  {
    const buttonStyle = {
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    return (
        <button style={buttonStyle} {...props}>
            {children}
        </button>
    );
};
export default Button