import os

new_teams = [
    ("Safro", "Safro"),
    ("MM", "MM")
]

base_dir = "content/teams"
pages = [
    ("index.mdx", "Overview"),
    ("define-opportunity.mdx", "Define Opportunity"),
    ("final-solution.mdx", "Final Solution"),
    ("formulate-hypothesis.mdx", "Formulate Hypothesis"),
    ("formulate-insight.mdx", "Formulate Insight"),
    ("ground-truth.mdx", "Ground Truth"),
    ("journey.mdx", "Journey")
]

for team_name, display_name in new_teams:
    folder_name = team_name.lower().replace(" ", "-")
    team_dir = os.path.join(base_dir, folder_name)
    os.makedirs(team_dir, exist_ok=True)
    
    # Create pages
    for filename, title in pages:
        filepath = os.path.join(team_dir, filename)
        if not os.path.exists(filepath):
            with open(filepath, "w") as f:
                f.write(f"---\nsidebarTitle: {title}\n---\n\n# {title} — {display_name}\n\nContent for {title}...\n")

    # Create _meta.js inside team folder
    meta_team_path = os.path.join(team_dir, "_meta.js")
    with open(meta_team_path, "w") as f:
        f.write("export default {\n")
        f.write('  "index": "Overview",\n')
        f.write('  "define-opportunity": "Define Opportunity",\n')
        f.write('  "final-solution": "Final Solution",\n')
        f.write('  "formulate-hypothesis": "Formulate Hypothesis",\n')
        f.write('  "formulate-insight": "Formulate Insight",\n')
        f.write('  "ground-truth": "Ground Truth",\n')
        f.write('  "journey": "Journey"\n')
        f.write("}\n")

print("Folders created successfully.")
