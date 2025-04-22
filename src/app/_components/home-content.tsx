'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book } from '@/interfaces';
import { LoaderCircleIcon } from 'lucide-react';

export const HomeContent: React.FC = () => {
  // const [books, setBooks] = React.useState<Book[]>([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get('http://localhost:3000/books');
  //       setBooks(response.data);
  //       setIsLoading(false);
  //       setIsError(false);
  //     } catch (err) {
  //       setBooks([]);
  //       setIsLoading(false);
  //       setIsError(true);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: () => {
      return axios.get('http://localhost:3000/books');
    },
  });

  const books = data?.data ?? [];

  // console.log({ data, isLoading });

  return (
    <div className="w-full">
      <h1 className="font-bold text-2xl">Welcome to the Books Data App</h1>
      <p className="my-4 text-lg">App designed to show the use of TanStack Query.</p>

      {isLoading && (
        <div className="flex flex-row items-center justify-center">
          <LoaderCircleIcon className="animate-spin" size={50} color="rgb(37 99 235)" />
        </div>
      )}

      {isError && <p className="text-lg text-red-500">There was an error while loading the data</p>}

      {!isLoading && !isError && books.length > 0 && (
        <Table>
          <TableCaption>The list of the Books</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Genre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book: Book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.genre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
