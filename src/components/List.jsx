import Card from "./Card";
import pt from "prop-types";

export default function List({ data, title, className, limit }) {
	return (
		<div className={"border border-slate-200 bg-white p-2 shadow " + className}>
			<div className="mb-2">
				<h1 className="text-lg font-bold">{title}</h1>
			</div>
			<div className=" custom-scrollbar overflow-x-scroll pb-1" id="list">
				<div className="flex w-fit items-start gap-2 py-1">
					{data.slice(0, limit).map((item) => {
						return <Card key={item.id} data={item} className={`w-[400px]`} />;
					})}
				</div>
			</div>
		</div>
	);
}

List.propTypes = {
	data: pt.any,
	title: pt.string,
	className: pt.string,
	limit: pt.number,
};
