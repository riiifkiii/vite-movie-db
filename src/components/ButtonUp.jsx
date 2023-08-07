import { BsArrowUp } from "react-icons/bs";
import Button from "./Button";

export default function ButtonUp() {
	window.addEventListener("scroll", () => {
		const button = document.querySelector(".button-up");
		if (window.scrollY > window.screen.height) {
			button.classList.remove("hidden");
			button.classList.add("flex");
			return;
		}
		if (window.scrollY <= window.screen.height) {
			button.classList.add("hidden");
			button.classList.remove("flex");
			return;
		}
	});

	return (
		<Button
			className={
				"button-up fixed bottom-5 right-5 hidden  items-center justify-center rounded bg-slate-800 p-3 font-bold text-slate-50"
			}
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
		>
			<BsArrowUp className="animate-pulse" />
		</Button>
	);
}
