'use client';

import useFetchDetailWiki from '@/service/wiki/queries/useFetchDetailWiki';
import { FormEvent, useState } from 'react';
import useUpdateWiki from './hooks/useUpdateWiki';

type WikiUpdatePageProps = {
    params: {
        id: string;
    };
};

export default function WikiUpdatePage({ params: { id } }: WikiUpdatePageProps) {
    const { data } = useFetchDetailWiki({ id });
    const [contents, setContents] = useState(data?.wiki.contents ?? '');

    const { mutate } = useUpdateWiki({ id });

    const updateWiki = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ contents, id });
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <p className="text-xl font-bold text-center">위키 업데이트 페이지</p>
                <form onSubmit={updateWiki} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            제목
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={data?.wiki.title}
                            placeholder="제목"
                            required
                            disabled
                            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="contents" className="block text-sm font-medium text-gray-700">
                            본문
                        </label>
                        <textarea
                            name="contents"
                            id="contents"
                            value={contents}
                            onChange={(e) => setContents(e.target.value)}
                            placeholder="본문"
                            required
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <p>업데이트</p>
                    </button>
                </form>
            </div>
        </main>
    );
}
