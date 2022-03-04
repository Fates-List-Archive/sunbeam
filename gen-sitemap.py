import asyncpg
import asyncio
import datetime
import os
from decimal import Decimal

sitemap = f"""
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>https://fateslist.xyz/</loc>
	<lastmod>{datetime.datetime.now()}</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://docs.fateslist.xyz</loc>
	<lastmod>{datetime.datetime.now()}</lastmod>
	<priority>1.0</priority>
</url>
"""

last_mod = os.path.getmtime("static/sitemap.xml")

async def get_all_bots():
    db = await asyncpg.create_pool()
    return await db.fetch("SELECT bot_id, last_updated_at FROM bots WHERE state = 0 OR state = 6 ORDER BY votes DESC, last_updated_at DESC, guild_count DESC, created_at DESC")

bots = asyncio.run(get_all_bots())

priority = Decimal('0.8')
decr = Decimal('0.1')
counter = 0

for bot in bots:
    if counter > 50 and priority > 0.5:
        priority -= decr
        counter = 0
    sitemap += f"""
<url>
	<loc>https://fateslist.xyz/bots/{bot['bot_id']}</loc>
	<lastmod>{bot['last_updated_at']}</lastmod>
	<priority>{priority}</priority>
</url>
    """
    counter += 1

sitemap += "</urlset>"

with open("static/sitemap.xml", "w") as file:
    file.write(sitemap)