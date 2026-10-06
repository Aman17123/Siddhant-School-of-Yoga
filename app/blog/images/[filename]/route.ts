import { NextRequest } from "next/server";
import { proxyBlogImage } from "@/blogsection/lib/serverImageUtils";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{
    filename: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { filename } = await params;
  return proxyBlogImage(filename);
}
