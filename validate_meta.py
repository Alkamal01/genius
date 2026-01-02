import os
import json
import re

def parse_meta_js(filepath):
    # Very basic parser for the simple exports we write
    content = open(filepath).read()
    matches = re.findall(r'"([^"]+)":', content)
    return matches

def parse_meta_json(filepath):
    try:
        data = json.load(open(filepath))
        return list(data.keys())
    except:
        return []

root = "content"
errors = []

for dirpath, dirnames, filenames in os.walk(root):
    # Check for _meta files
    meta_files = [f for f in filenames if f.startswith("_meta.")]
    for mf in meta_files:
        path = os.path.join(dirpath, mf)
        keys = []
        if mf.endswith(".js"):
            keys = parse_meta_js(path)
        elif mf.endswith(".json"):
            keys = parse_meta_json(path)
            
        for key in keys:
            if key.startswith('(') or key.startswith('_'): continue # skip special nextra keys?
            
            # Check if key resolves to a file or directory
            # Possible resolutions:
            # key.md, key.mdx, key/index.md, key/index.mdx, or just key/ (if implicit)
            
            candidates = [
                os.path.join(dirpath, key + ".md"),
                os.path.join(dirpath, key + ".mdx"),
                os.path.join(dirpath, key),
                os.path.join(dirpath, key, "index.md"),
                os.path.join(dirpath, key, "index.mdx")
            ]
            
            if key == "index":
                candidates = [
                    os.path.join(dirpath, "index.md"),
                    os.path.join(dirpath, "index.mdx")
                ]
            
            found = False
            for c in candidates:
                if os.path.exists(c):
                    found = True
                    break
            
            if not found:
                errors.append(f"Error in {path}: Key '{key}' points to missing content.")

if errors:
    print("\n".join(errors))
else:
    print("No obvious broken links found in _meta files.")
