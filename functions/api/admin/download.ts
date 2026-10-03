// Cloudflare Pages Function: /api/admin/download
// Downloads manuscript files directly from Cloudflare R2 bucket for the Editorial Office

interface Env {
  MANUSCRIPTS_BUCKET?: R2Bucket;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const url = new URL(context.request.url);
    const key = url.searchParams.get("key")?.trim() || "";
    const fileName = url.searchParams.get("name")?.trim() || "manuscript.docx";

    if (!key) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing file key parameter." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!context.env.MANUSCRIPTS_BUCKET) {
      return new Response(
        JSON.stringify({ success: false, message: "Cloudflare R2 Bucket binding not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const object = await context.env.MANUSCRIPTS_BUCKET.get(key);
    if (!object) {
      return new Response(
        JSON.stringify({ success: false, message: `File not found in R2 storage at key: ${key}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`);

    return new Response(object.body, {
      headers,
    });
  } catch (error: any) {
    console.error("Admin file download error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to download file from R2." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
