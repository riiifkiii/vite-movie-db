import { Link } from "react-router-dom";
import pt from "prop-types";

export default function Button({
	to,
	rel,
	className,
	onClick,
	children,
	icon,
	target,
	title,
}) {
	const ButtonLink = () => {
		return (
			<Link
				to={to}
				// ref={`noopener noreferrer`}
				className={`flex items-center gap-1 ` + className}
				onClick={onClick}
				target={target}
				title={title}
				rel={rel}
			>
				{icon}
				{children}
			</Link>
		);
	};

	const ButtonElement = () => {
		return (
			<button
				className={`flex items-center gap-1 ` + className}
				onClick={onClick}
				title={title}
			>
				{icon}
				{children}
			</button>
		);
	};

	return <>{to ? <ButtonLink /> : <ButtonElement />}</>;
}

Button.propTypes = {
	to: pt.string,
	rel: pt.string,
	className: pt.string,
	onClick: pt.func,
	children: pt.any,
	icon: pt.any,
	target: pt.string,
	title: pt.string,
};
