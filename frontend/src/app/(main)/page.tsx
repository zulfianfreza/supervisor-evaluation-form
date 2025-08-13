import AssessmentForm from "@/components/assessment-form";
import { getQuestions } from "@/services/question.service";
import { QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get-questions", { sort_by: "created_at.ASC" }],
    queryFn: () => getQuestions({ sort_by: "created_at.ASC" }),
  });

  return (
    <div className=" min-h-screen w-full bg-neutral-200/80 p-4">
      <div className=" max-w-2xl w-full mx-auto">
        <div className=" w-full aspect-[3.5/1] relative rounded-t-lg overflow-hidden bg-[url(/images/background.jpg)] bg-center bg-cover" />
        <AssessmentForm />
      </div>
    </div>
  );
}
