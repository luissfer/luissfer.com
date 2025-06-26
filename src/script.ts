const blog = await fetchBlog("Hacking Netflix");
const project = await fetchProjects("Ricing Arch Hyprland");
populateUI(blog, project);

async function fetchBlog(blogId:string):Promise<any> {
    const result =  await fetch(`localhost:8080/blogs/${blogId}`, {
        method: "GET"
    });

    return result.json();
}

async function fetchProjects(projectId:string):Promise<any> {
    const result =  await fetch(`localhost:8080/project/${projectId}`, {
        method: "GET"
    });

    return result.json();
}

function populateUI(blog: any, project: any) {
    document.getElementById("blogName")!.innerText = blog.blog_name;
    document.getElementById("blogUrl")!.innerText = blog.blog_url;
    document.getElementById("projectName")!.innerText = project.project_name;
    document.getElementById("projectResume")!.innerText = project.project_resume;


}