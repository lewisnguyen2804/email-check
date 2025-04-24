import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

const Paginator = ({ totalPages = 10 }) => {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const createPageLink = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    return `${location.pathname}?${newParams.toString()}`;
  };

  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p > 0 && p <= totalPages
  );

  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageLink(currentPage - 1)} />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageLink(1)}>1</PaginationLink>
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageLink(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={createPageLink(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
