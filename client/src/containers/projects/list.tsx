'use client';
import { useState } from 'react';

import { Search } from 'lucide-react';

import { useGetProjects } from '@/types/generated/project';

import Filters from '@/containers/filters';
import ProjectItem from '@/containers/projects/item';

import { Input } from '@/components/ui/input';

export default function ProjectsList() {
  const [searchValue, setSearchValue] = useState('');

  const { data } = useGetProjects({
    populate: '*',
    filters: {
      name: {
        $contains: searchValue,
      },
    },
  });

  return (
    <div className="no-scrollbar flex max-h-[75vh] flex-col space-y-2 overflow-y-auto">
      <div className="relative flex justify-between">
        <Input
          placeholder="Search project by name"
          className="border-none bg-gray-100 pl-11 placeholder:text-gray-500"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search size={24} className="absolute left-2 top-2" />

        <Filters />
      </div>
      {data?.data && data.data.map((project) => <ProjectItem key={project?.id} data={project} />)}
    </div>
  );
}
