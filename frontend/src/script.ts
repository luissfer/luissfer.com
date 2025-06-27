interface Blog {
  blog_name: string;
  blog_url: string;
}

interface Project {
  project_name: string;
  project_resume: string;
}

const blog = await fetchBlog("Cyber Blog");
const project = await fetchProject("Matrix Project");
populateUI(blog, project);

async function fetchBlog(blogName: string): Promise<Blog> {
  const result = await fetch(`localhost:5432/blogs/${encodeURIComponent(blogName)}`, {
    method: "GET"
  });

  if (!result.ok) {
    throw new Error(`Error fetching blog: ${result.statusText}`);
  }

  return result.json();
}

async function fetchProject(projectName: string): Promise<Project> {
  const result = await fetch(`localhost:5432/projects/${encodeURIComponent(projectName)}`, {
    method: "GET"
  });

  if (!result.ok) {
    throw new Error(`Error fetching project: ${result.statusText}`);
  }

  return result.json();
}

function populateUI(blog: Blog, project: Project) {
  document.getElementById("blogName")!.innerText = blog.blog_name;
  const blogUrl = document.getElementById("blogUrl")! as HTMLAnchorElement;
  blogUrl.innerText = blog.blog_url;
  blogUrl.href = blog.blog_url;

  document.getElementById("projectName")!.innerText = project.project_name;
  document.getElementById("projectResume")!.innerText = project.project_resume;
}
