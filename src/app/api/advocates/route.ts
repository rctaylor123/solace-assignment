import db from '@/db';
import { ilike, or, sql, asc } from 'drizzle-orm';
import { PgSelectQueryBuilder } from 'drizzle-orm/pg-core';
import { NextRequest } from 'next/server';

import { advocates } from '@/db/schema';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') || '';
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '5');

  let query = db.select().from(advocates).orderBy(asc(advocates.lastName), asc(advocates.firstName)).$dynamic();
  if (search && search.length > 0) {
    query = query.where(buildWhere(query, search));
  }

  const totalCount = await db.$count(query); // count the total number of records before pagination
  query = withPagination(query, page, pageSize);
  const resp = await query;
  return Response.json({ advocates: resp, totalCount: totalCount });
}

function buildWhere(query: PgSelectQueryBuilder, search: string) {
  return or(
    ilike(advocates.firstName, `%${search}%`),
    ilike(advocates.lastName, `%${search}%`),
    ilike(advocates.city, `%${search}%`),
    ilike(advocates.degree, `%${search}%`),
    sql`${advocates.specialties}::text ilike ${`%${search}%`}`,
    sql`${advocates.phoneNumber}::text ilike ${`%${search}%`}`,
    sql`${advocates.yearsOfExperience}::text ilike ${`%${search}%`}`,
    sql`concat(${advocates.firstName}, ' ', ${advocates.lastName}) ilike ${`%${search}%`}`
  );
}

function withPagination(query: PgSelectQueryBuilder, page: number, pageSize: number) {
  return query.limit(pageSize).offset((page - 1) * pageSize);
}
