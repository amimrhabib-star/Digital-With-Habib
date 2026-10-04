import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const content=sqliteTable('site_content',{id:integer('id').primaryKey(),payload:text('payload').notNull(),revision:integer('revision').notNull()});
export const revisions=sqliteTable('content_revisions',{revision:integer('revision').primaryKey(),payload:text('payload').notNull(),createdAt:text('created_at').notNull()});
export const media=sqliteTable('media',{key:text('key').primaryKey(),mime:text('mime').notNull(),size:integer('size').notNull(),createdAt:text('created_at').notNull()});
export const inquiries=sqliteTable('inquiries',{id:text('id').primaryKey(),payload:text('payload').notNull(),createdAt:text('created_at').notNull()});
export const subscribers=sqliteTable('subscribers',{email:text('email').primaryKey(),payload:text('payload').notNull(),createdAt:text('created_at').notNull()});
export const limits=sqliteTable('request_limits',{key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
