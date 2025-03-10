// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PrismaClient } from "@prisma/client";
import type { Redis } from "ioredis"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authedUser: UserWithoutPassword | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	var prisma=PrismaClient;
	var redis=Redis(env("REDIS_URL"));
}

export {};
