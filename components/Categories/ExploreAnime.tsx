import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import getExplore from "../../utils/getExplore";
import { IAnimes } from "../../typing.d.ts";
import Image from "next/image";
import apiVariables from "../../utils/apiVariables";
import genres from "../../constants/genres";
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  type: 'tv' | 'movie';
  page: number;
  genre: string;
  sort: string;
  search: string;
  setMaxPages: Dispatch<SetStateAction<number>>;
}

export default function ExploreAnime({ type, page, genre, sort, search, setMaxPages }: Props) {
  const router = useRouter();
  const base_url = apiVariables.images.base_url;
  const size = apiVariables.images.poster_sizes;
  const poster = `${base_url}${size[3]}`;
  const [animeList, setAnimeList] = useState<IAnimes[]>([]);
  const [ref] = useAutoAnimate();

  const setRef = useCallback((node: HTMLOptionElement) => {
    ref(node);
  }, [ref]);

  const getAll = useCallback(async () => {
    if (genre) {
      const response = await getExplore(type, type === 'tv' ? genres[genre].id : genres[genre].movie || genres[genre].id, sort, page, search);
      if (response) {
        const { results } = response;
        const { total_pages } = response;
        if (search.length > 1) {
          const filteredList = results.filter((anime: IAnimes) => anime.genre_ids.includes(16));
          setAnimeList(filteredList);
          setMaxPages(total_pages)
        } else {
          setAnimeList(results);
          setMaxPages(total_pages)
        }
      }
    }
  }, [type, genre, sort, page, search, setMaxPages]);

  useEffect(() => {
    if (type || page || search || sort || genre) {
      getAll();
    }
  }, [type, page, search, sort, genre, getAll]);

  return (
    <section
      ref={setRef}
      className="transition-all duration-500 w-64vh mt-[4rem] ml-[36vh] min-h-screen p-10 flex flex-row flex-wrap gap-10 justify-center items-center"
    >
      {animeList.map((anime) => (
        <Image
          style={{ width: 160, height: 'auto' }}
          width={0}
          height={0}
          alt={anime.name || anime.title}
          src={`${poster}${anime.poster_path}`}
          onClick={() => { router.push(`/${type}/details/${anime.id}`) }}
          key={anime.id}
          priority
          className="
            transition-all
            duration-200
            hover:scale-110
            border-2
            hover:border-yellow
            rounded-xl
            cursor-pointer
          "
        />
      ))}
    </section>
  );
}
