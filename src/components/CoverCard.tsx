import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects"> | CollectionEntry<"covers">
  pill?: boolean
}

export default function CoverCard({entry, pill}: Props) {
    return (
      <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-3 flex items-center rounded-lg hover:bg-black/5 hover:dark:bg-white/10  transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="font-semibold mt-3 text-black text-center dark:text-white">
          <img src={entry.data.cover} alt="Bruh" class="p-4"/>
          {entry.data.title}
        </div>
        <ul class="flex flex-wrap justify-center mt-2 gap-1">
          {entry.data.tags.map((tag:string) => ( // this line has an error; Parameter 'tag' implicitly has an 'any' type.ts(7006)
            <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
   )
}