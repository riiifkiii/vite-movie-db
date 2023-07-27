import { Link } from "react-router-dom";
import pt from "prop-types";

export default function Button({
	to,
	ref,
	className,
	onClick,
	children,
	icon,
}) {
	const ButtonLink = () => {
		return (
			<Link
				to={to}
				ref={ref}
				className={`flex items-center gap-1 ` + className}
				onClick={onClick}>
				{icon}
				{children}
			</Link>
		);
	};

	const ButtonElement = () => {
		return (
			<button
				className={`flex items-center gap-1 ` + className}
				onClick={onClick}>
				{icon}
				{children}
			</button>
		);
	};

	return <>{to ? <ButtonLink /> : <ButtonElement />}</>;
}

Button.propTypes = {
	to: pt.string,
	ref: pt.string,
	className: pt.string,
	onClick: pt.func,
	children: pt.any,
	icon: pt.any,
};