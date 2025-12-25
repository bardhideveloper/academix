from django.db import models
from courses.models import Course


class Section(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="sections"
    )

    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]
        unique_together = ("course", "order")

    def __str__(self):
        return f"{self.course.title} | {self.title}"


class Lesson(models.Model):
    CONTENT_TYPE_CHOICES = (
        ("video", "Video"),
        ("article", "Article"),
    )

    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="lessons"
    )

    title = models.CharField(max_length=255)
    content_type = models.CharField(
        max_length=10,
        choices=CONTENT_TYPE_CHOICES
    )

    order = models.PositiveIntegerField()
    is_preview = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]
        unique_together = ("section", "order")

    def __str__(self):
        return self.title


class LessonContent(models.Model):
    lesson = models.OneToOneField(
        Lesson,
        on_delete=models.CASCADE,
        related_name="content"
    )

    video_url = models.URLField(blank=True, null=True)
    article_text = models.TextField(blank=True, null=True)

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.lesson.content_type == "video" and not self.video_url:
            raise ValidationError("Video lesson must have a video URL.")

        if self.lesson.content_type == "article" and not self.article_text:
            raise ValidationError("Article lesson must have article text.")

    def __str__(self):
        return f"Content for: {self.lesson.title}"
