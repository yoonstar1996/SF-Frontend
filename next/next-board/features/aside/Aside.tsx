"use client";

import { Button, SearchBar } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { pagesAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

function Aside() {
  const [pages, setPages] = useAtom(pagesAtom);
  const router = useRouter();
  const { toast } = useToast();

  const createPage = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .insert([
          {
            title: "",
            from: null,
            to: null,
            boards: [],
          },
        ])
        .select();

      if (status === 201 && data) {
        setPages([...pages, data[0]]);
        toast({
          title: "새로운 TODO-LIST 생성되었습니다.",
          description: "supabase 데이터베이스를 참고해보세요.",
        });
        router.push(`/board/${data[0].id}`);
      }

      if (error) {
        console.error("Error inserting data:", error);
        toast({
          variant: "destructive",
          title: "에러 발생",
          description: "에러 발생",
        });
        return;
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <aside className="page__aside">
      {/* 검색창 UI */}
      <SearchBar placeholder="검색어를 입력하세요." />
      {/* Add New Page 버튼 UI */}
      <Button
        className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]"
        onClick={createPage}
      >
        Add New Page
      </Button>
      {/* TODO 목록 UI 하나 */}
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#A6A6A6]">
          {"Yoonstar's"}
        </small>
        <ul className="flex flex-col">
          <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
            Enter Title
          </li>
          <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
            Enter Title
          </li>
        </ul>
      </div>
    </aside>
  );
}

export { Aside };