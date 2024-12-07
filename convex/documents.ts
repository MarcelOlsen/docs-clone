import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, { searchQuery, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (searchQuery && organizationId)
      return ctx.db
        .query("documents")
        .withSearchIndex("searchTitle", (q) =>
          q.search("title", searchQuery).eq("organizationId", organizationId),
        )
        .paginate(paginationOpts);

    if (searchQuery)
      return await ctx.db
        .query("documents")
        .withSearchIndex("searchTitle", (q) =>
          q.search("title", searchQuery).eq("ownerId", user.subject),
        )
        .paginate(paginationOpts);

    if (organizationId)
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId),
        )
        .paginate(paginationOpts);

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const removeById = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId == user.subject;

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const isAdmin = user.role == "org:admin";
    const isOrganizationMember = !!(
      organizationId && document.organizationId === organizationId
    );

    if (isOwner || (isOrganizationMember && isAdmin)) {
      console.log("Is owner or is admin in current org");
      return ctx.db.delete(args.id);
    }

    throw new ConvexError("Unauthorized");
  },
});

export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId == user.subject;

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
    const isOrgMember = !!(
      organizationId && organizationId === user.organizationId
    );

    if (!isOwner && !isOrgMember) throw new ConvexError("Unauthorized");

    return ctx.db.patch(args.id, { title: args.title });
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);

    if (!document) throw new ConvexError("Document not found");

    return document;
  },
});
