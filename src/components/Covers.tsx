import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import CoverCard from "@components/CoverCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  data: CollectionEntry<"covers">[]
}

export default function Covers({ data, tags }: Props) {
  const [filter, setFilter] = createSignal<string | null>(null)
  const [covers, setCovers] = createSignal<CollectionEntry<"covers">[]>([])

  createEffect(() => {
    setCovers(
      filter()
        ? data.filter((entry) =>
            entry.data.tags.some((tag: string) => tag.toLowerCase() === filter()?.toLowerCase())
          )
        : data
    )
  })

  function toggleTag(tag: string) {
    setFilter((prev) => (prev === tag ? null : tag))
  }

  return (
    <div>
    <div class="grid grid-cols-1 gap-6 max-w-screen-lg mx-auto px-5">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div>
          <ul class="flex flex-wrap gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button
                    onClick={() => toggleTag(tag)}
                    class={cn(
                      "w-full px-2 py-1 rounded",
                      "whitespace-nowrap overflow-hidden overflow-ellipsis",
                      "flex gap-2 items-center",
                      "bg-black/5 dark:bg-white/10",
                      "hover:bg-black/10 hover:dark:bg-white/15",
                      "transition-colors duration-300 ease-in-out",
                      filter() === tag && "text-black dark:text-white"
                    )}
                  >
                    <svg
                      class={cn(
                        "size-5 fill-black/50 dark:fill-white/50",
                        "transition-colors duration-300 ease-in-out",
                        filter() === tag && "fill-black dark:fill-white"
                      )}
                    >
                      <use href={`/ui.svg#circle`} class={cn(filter() !== tag ? "block" : "hidden")} />
                      <use href={`/ui.svg#circle-check`} class={cn(filter() === tag ? "block" : "hidden")} />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
          <div class="text-sm uppercase mb-2">
            SHOWING {covers().length} OF {data.length} COVERS
          </div>
      </div>
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">

          <ul class="grid lg:grid-cols-2 max-w-screen-lg mx-auto px-5">
            {covers().map((cover) => (
              <li>
                <CoverCard entry={cover} />
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}
