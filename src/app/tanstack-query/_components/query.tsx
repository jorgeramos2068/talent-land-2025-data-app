'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderCircleIcon } from 'lucide-react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book } from '@/interfaces';

export const Query: React.FC = () => {
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
