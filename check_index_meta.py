import os
import re

root_dir = "content"
problems = []

for dirpath, dirnames, filenames in os.walk(root_dir):
    meta_file = None
    if "_meta.js" in filenames:
        meta_file = "_meta.js"
    elif "_meta.json" in filenames:
        meta_file = "_meta.json"
    
    if meta_file:
        full_path = os.path.join(dirpath, meta_file)
        with open(full_path, "r") as f:
            content = f.read()
            
        # Check if "index" is used as a key
        if '"index":' in content or "'index':" in content or "index:" in content:
            # Check if index.md or index.mdx exists in the same specific directory
            has_index = "index.md" in filenames or "index.mdx" in filenames
            if not has_index:
                problems.append(full_path)

if problems:
    print("Found _meta files with 'index' key but no index file:")
    for p in problems:
        print(p)
else:
    print("All _meta files with 'index' key have a corresponding index file.")
