from course_content.strategies.video_strategy import VideoLessonStrategy
from course_content.strategies.article_strategy import ArticleLessonStrategy
from course_content.strategies.mixed_strategy import MixedLessonStrategy

class LessonContentStrategyFactory:
    _strategies = {
        "video": VideoLessonStrategy(),
        "article": ArticleLessonStrategy(),
        "mixed": MixedLessonStrategy(),
    }

    @staticmethod
    def get_strategy(content_type: str):
        """
        Return the correct strategy instance
        based on lesson content_type
        """
        strategy = LessonContentStrategyFactory._strategies.get(content_type)
        if not strategy:
            raise ValueError(f"No strategy found for content_type: {content_type}")
        return strategy