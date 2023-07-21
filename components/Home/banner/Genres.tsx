import React from "react";
import { movieGenres, tvGenres } from "../../../constants/genres";

interface Props {
    genres: number[],
    mediaType: 'tv' | 'movie',
    lang: string
}

export default function Genres({ genres, mediaType, lang }: Props) {
    return (
        <>
            {genres && genres.length > 0 && (
                <div className="flex justify-center sm:justify-start gap-1">
                    {genres.map((item, i, arr) => (
                        <span key={i} className="text-yellow font-bold" style={{ lineHeight: 1 }}>
                            {`${mediaType === "movie"
                                ? lang === 'pt-br'
                                    ? movieGenres[item].BRname
                                    : movieGenres[item].ENGname
                                : lang === 'pt-br'
                                    ? tvGenres[item].BRname
                                    : tvGenres[item].ENGname
                                }${i !== arr.length - 1 && arr.length > 1 ? ` | ` : ""}`}
                        </span>
                    ))}
                </div>
            )}
        </>
    )
}
