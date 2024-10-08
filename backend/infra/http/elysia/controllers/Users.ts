import { CreateUser, GetStatistics } from "@enki/application";
import { Category } from "@enki/domain";
import { type HashProviderKeys, hashProviders } from "@hyoretsu/providers";
import { Elysia, t } from "elysia";
import { usersRepository } from "~/sql/kysely";

export const UsersController = new Elysia()
	.decorate({
		hashProvider: new hashProviders[process.env.HASH_DRIVER as HashProviderKeys](),
		usersRepository,
	})
	.group("/users", app => {
		const { hashProvider, usersRepository } = app.decorator;

		return app
			.decorate({
				createUser: new CreateUser(hashProvider, usersRepository),
				getStatistics: new GetStatistics(usersRepository),
			})
			.post("/", ({ body, createUser }) => createUser.execute(body), {
				detail: {
					tags: ["Users"],
				},
				body: t.Object({
					email: t.String({ format: "email" }),
					password: t.String(),
				}),
				response: t.Object({
					email: t.String({ examples: ["hello@example.com"] }),
					createdAt: t.Date({ examples: [new Date()] }),
					updatedAt: t.Date({ examples: [new Date()] }),
				}),
			})
			.get("/stats", ({ getStatistics, query }) => getStatistics.execute(query), {
				detail: {
					tags: ["Users"],
				},
				query: t.Object({
					categories: t.Optional(t.Array(t.Enum(Category))),
					userId: t.String(),
				}),
				response: t.Object({
					totalTime: t.Array(t.Integer()),
				}),
			});
	});
