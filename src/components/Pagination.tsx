import type { FC } from "react";

type PageItem = number | "left-ellipsis" | "right-ellipsis"


interface PaginationProps {
    total:number;
    page:number;
    pageSize: number;
    onChange?: (page: number) => void;
    maxButtons?: number;
}

/**
 * Pagination component for navigating through pages of data.
 * 
 * Renders a navigation component with previous/next buttons and numbered page links.
 * Intelligently displays page numbers with ellipsis (...) when there are too many pages.
 * 
 * @component
 * @example
 * ```tsx
 * <Pagination 
 *   total={100} 
 *   page={1} 
 *   pageSize={10} 
 *   onChange={(page) => console.log(page)}
 *   maxButtons={7}
 * />
 * ```
 * 
 * @param {PaginationProps} props - The pagination configuration
 * @param {number} props.total - Total number of items
 * @param {number} props.page - Current active page (1-indexed)
 * @param {number} props.pageSize - Number of items per page
 * @param {(page: number) => void} [props.onChange] - Callback fired when page changes. Defaults to no-op.
 * @param {number} [props.maxButtons=7] - Maximum number of page buttons to display
 * 
 * @returns {JSX.Element | null} Pagination navigation element, or null if total pages <= 1
 * 
 * @remarks
 * - Returns null when there's only one page or less
 * - Always maintains an ellipsis (...) when pages are skipped
 * - Prevents navigation to invalid pages or the current page
 * - Uses Bulma CSS framework classes for styling
 * - Fully accessible with ARIA labels and attributes
 */
/**
 * Pagination component for navigating through paginated data.
 * 
 * Renders a navigation component with previous/next buttons and page numbers.
 * Intelligently displays page buttons with ellipsis for large page ranges.
 * 
 * @component
 * @example
 * ```tsx
 * <Pagination 
 *   total={500} 
 *   page={1} 
 *   pageSize={10} 
 *   onChange={(page) => setPage(page)}
 *   maxButtons={7}
 * />
 * ```
 * 
 * @param {PaginationProps} props - The component props
 * @param {number} props.total - Total number of items
 * @param {number} props.page - Current page number (1-indexed)
 * @param {number} props.pageSize - Number of items per page
 * @param {(page: number) => void} [props.onChange] - Callback fired when page changes
 * @param {number} [props.maxButtons=7] - Maximum number of page buttons to display
 * 
 * @returns {React.ReactElement | null} The pagination navigation element, or null if only one page exists
 */
const Pagination: FC<PaginationProps> = ({
    total,
    page,
    pageSize,
    onChange = () => {},
    maxButtons = 7
}:PaginationProps) =>  {
    const totalPages = Math.max(1, Math.ceil(total/pageSize));
    
    if (totalPages <= 1 ) {
        return null;
    }

    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxButtons -1);

    if (end - start + 1 < maxButtons) {
        start = Math.max(1, end - maxButtons + 1);
    }

    const pages: PageItem[] = [];
    if (start > 1) {
        pages.push(1);
        if (start > 2) {
            pages.push("left-ellipsis");
        }
    }

    for (let i = start; i<= end; i++) {
        pages.push(i)
    }

    if (end < totalPages) {
        if (end < totalPages -1) {
            pages.push("right-ellipsis");
        }
        pages.push(totalPages);
    }

    const go = (p: number) => {
        if (p < 1 || p > totalPages || p === page) {
            return;
        }
        onChange(p)
    }

    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <button
                className="pagination-previous"
                onClick={() => go(page - 1)}
                disabled={page <= 1}
                aria-disabled={page <= 1}
            >
                Previous
            </button>

            <button
                className="pagination-next"
                onClick={() => go(page + 1)}
                disabled={page >= totalPages}
                aria-disabled={page >= totalPages}
            >
                Next
            </button>

            <ul className="pagination-list">
                {pages.map( (p, idx) => 
                    typeof p === "number" ? (
                        <li key={p}>
                            <button
                                className={`pagination-link ${p===page ? "is-current" : ""}`}
                                aria-current={p ===page ? "page" : undefined}
                                onClick={() => go(p)}
                                aria-label={p === page ? `Page ${p}, current` : `Go to page ${p}`}
                            >{p}</button>
                        </li>
                    ) : (
                        <li key={`${p}-${idx}`}>
                            <span className="pagination-ellipsis">&hellip;</span>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}

export default Pagination;
