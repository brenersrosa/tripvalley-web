type Text = {
  title: string;
};

export function Title({ title }: Text) {
  return (
    <div className="hidden md:flex pb-14">
      <span className="border-blue-500 border-l-8 border-r-2 rounded-r-md mr-3 ml-10 sm:ml-0"></span>
      <h2 className="text-gray-800 font-bold text-3xl">{title}</h2>
    </div>
  );
}
