package tech.spaceoso.jobboard.model;

public class Job {
    private Long id;
    private String title;
    private Location location;
    private String description;
    private Long employerId;

    public Job(Long id, String title, Location location, String description, Long employerId) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.description = description;
        this.employerId = employerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
