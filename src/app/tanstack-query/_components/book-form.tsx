import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book } from '@/interfaces';

export const bookSchema = z.object({
  title: z.string().trim().min(1, { message: 'The field is required' }),
  author: z.string().trim().min(1, { message: 'The field is required' }),
  year: z.string().trim().min(1, { message: 'The field is required' }),
  genre: z.string().trim().min(1, { message: 'The field is required' }),
});

export type BookInputs = z.infer<typeof bookSchema>;

export const BookForm: React.FC = () => {
  // const queryClient = useQueryClient();
  const form = useForm<BookInputs>({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      genre: '',
    },
    resolver: zodResolver(bookSchema),
    shouldFocusError: false,
  });

  const { mutate } = useMutation({
    mutationFn: (payload: Book) => {
      return axios.post<Book>('http://localhost:3000/books', payload);
    },
    onSuccess: () => {
      toast.success('Success', {
        description: 'Data was saved successfully.',
        duration: 4000,
        position: 'bottom-center',
      });
      // queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const onSubmit: SubmitHandler<BookInputs> = (data: BookInputs) => {
    console.log(data);
    const payload: Book = {
      id: uuidv4(),
      ...data,
    };
    mutate(payload);
  };

  return (
    <div className="my-8 w-full">
      <h2 className="mb-4 text-xl">Add a new book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={
                /* istanbul ignore next */
                ({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-red-600">*</span>
                    </FormLabel>
                    <Input type="text" placeholder="Title" value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <FormField
              control={form.control}
              name="author"
              render={
                /* istanbul ignore next */
                ({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Author <span className="text-red-600">*</span>
                    </FormLabel>
                    <Input type="text" placeholder="Author" value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <FormField
              control={form.control}
              name="year"
              render={
                /* istanbul ignore next */
                ({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Year <span className="text-red-600">*</span>
                    </FormLabel>
                    <Input type="text" placeholder="Year" value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <FormField
              control={form.control}
              name="genre"
              render={
                /* istanbul ignore next */
                ({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Genre <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select value={field.value} defaultValue="" onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Horror">Horror</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }
            />

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
