import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import Button from "./Button";

export default function TopBar() {
	return (
		<div
			id="top-bar"
			className=" fixed left-[300px] top-0 z-50 flex h-[70px] w-[calc(100vw-300px)] items-center justify-between border-b border-slate-200 bg-white px-5"
		>
			<div>
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Find your movies, tv or person!"
					className="h-10 w-[800px] border border-slate-200 p-2"
				/>
			</div>
			<div className="flex items-center gap-2">
				<Button
					to={"https://www.instagram.com/riiifkiii"}
					// ref={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoInstagram />
				</Button>
				<Button
					to={"https://linkedin.com/in/riiifkiii"}
					// ref={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoLinkedin />
				</Button>
				<Button
					to={"https://www.github.com/riiifkiii"}
					// ref={`noopener noreferrer`}
					target={"blank"}
				>
					<BiLogoGithub />
				</Button>
			</div>
		</div>
	);
}
