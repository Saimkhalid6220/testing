import SearchBars from "@/components/searchBars"
const layout = async({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <>
     <SearchBars />
    {children}
    </>
  )
}

export default layout