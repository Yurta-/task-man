import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "/$types"

export const load: PageServerLoad = async ({cookies}) => {
    cookies.set("authToken", "", {maxAge: 0, path: "/"});
    throw redirect(302, "/login");
}
