from django.db import models
from courses.models import Course


class CourseContentSection(models.Model):
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="content_sections"
    )
    title = models.CharField(max_length=255)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "course_content_section"
        ordering = ["order"]

    def __str__(self):
        return self.title


class CourseContentLesson(models.Model):
    id = models.AutoField(primary_key=True)
    section = models.ForeignKey(
        CourseContentSection,
        on_delete=models.CASCADE,
        related_name="lessons"
    )
    title = models.CharField(max_length=255)
    content_type = models.CharField(
        max_length=50,
        choices=[
            ("video", "Video"),
            ("article", "Article"),
            ("mixed", "Mixed"),
        ]
    )
    order = models.IntegerField(default=0)
    is_preview = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "course_content_lesson" 
        ordering = ["order"]

    def __str__(self):
        return self.title


class CourseContentLessonContent(models.Model):
    id = models.AutoField(primary_key=True)
    lesson = models.OneToOneField(
        CourseContentLesson,
        on_delete=models.CASCADE,
        related_name="content"
    )
    video_url = models.URLField(blank=True, null=True)
    article_text = models.TextField(blank=True, null=True)
    article_pdf = models.FileField(
        upload_to="lesson_pdfs/",
        blank=True,
        null=True
    )

    class Meta:
        db_table = "course_content_lessoncontent"

    def __str__(self):
        return f"Content for {self.lesson.title}"
