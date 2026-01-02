import os

root_dir = "content"

for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename == "_meta.js":
            path = os.path.join(dirpath, filename)
            with open(path, "r") as f:
                lines = f.readlines()
            
            new_lines = []
            for line in lines:
                if '"index":' in line or "'index':" in line or "index:" in line:
                    continue # Skip this line
                new_lines.append(line)
                
            with open(path, "w") as f:
                f.writelines(new_lines)

        elif filename == "_meta.json":
            # Just delete it if it's there? Or parse it.
            # I think I only have _meta.js now except maybe in legacy.
            pass

print("Removed index keys from all _meta.js files.")
