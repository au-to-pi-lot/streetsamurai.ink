import React from "react";
import Content from "@/app/(ui)/content.mdx";

export type PageProps = {}

const Page = ({...props}: PageProps): React.JSX.Element => (
    <Content/>
)

export default Page;
