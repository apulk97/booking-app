export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const buttonStyle = {
    padding: "4px 10px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#f0f0f0",
  };

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
            <button
              style={{ ...buttonStyle, ...buttonHoverStyle }}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
