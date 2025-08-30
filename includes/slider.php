<div class="slider">
    <div class="slides-container">
        <div class="slides" id="slides">
            <?php
            $slidesCount = count($slides);
            if ($slidesCount > 0):
                // اضافه کردن اسلاید آخر به ابتدا برای انیمیشن پیوسته
                $lastSlide = $slides[$slidesCount - 1];
            ?>
                <div class="slide clone">
                    <img src="<?= htmlspecialchars($lastSlide['image_url']); ?>" alt="<?= htmlspecialchars($lastSlide['title']); ?>">
                    <div class="slide-content">
                        <h2><?= htmlspecialchars($lastSlide['title']); ?></h2>
                        <p><?= htmlspecialchars($lastSlide['description']); ?></p>
                        <?php if (!empty($lastSlide['button_link']) && !empty($lastSlide['button_text'])): ?>
                            <a href="<?= htmlspecialchars($lastSlide['button_link']); ?>" class="btn">
                                <?= htmlspecialchars($lastSlide['button_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <?php foreach ($slides as $index => $slide): ?>
                    <div class="slide">
                        <img src="<?= htmlspecialchars($slide['image_url']); ?>" alt="<?= htmlspecialchars($slide['title']); ?>">
                        <div class="slide-content">
                            <h2><?= htmlspecialchars($slide['title']); ?></h2>
                            <p><?= htmlspecialchars($slide['description']); ?></p>
                            <?php if (!empty($slide['button_link']) && !empty($slide['button_text'])): ?>
                                <a href="<?= htmlspecialchars($slide['button_link']); ?>" class="btn">
                                    <?= htmlspecialchars($slide['button_text']); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>

                <?php
                // اضافه کردن اسلاید اول به انتها برای انیمیشن پیوسته
                $firstSlide = $slides[0];
                ?>
                <div class="slide clone">
                    <img src="<?= htmlspecialchars($firstSlide['image_url']); ?>" alt="<?= htmlspecialchars($firstSlide['title']); ?>">
                    <div class="slide-content">
                        <h2><?= htmlspecialchars($firstSlide['title']); ?></h2>
                        <p><?= htmlspecialchars($firstSlide['description']); ?></p>
                        <?php if (!empty($firstSlide['button_link']) && !empty($firstSlide['button_text'])): ?>
                            <a href="<?= htmlspecialchars($firstSlide['button_link']); ?>" class="btn">
                                <?= htmlspecialchars($firstSlide['button_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <?php if (count($slides) > 1): ?>
        <div class="slider-nav">
            <?php foreach ($slides as $index => $slide): ?>
                <div class="slider-dot <?= $index === 0 ? 'active' : ''; ?>"></div>
            <?php endforeach; ?>
        </div>

        <button class="slider-arrow prev" id="prev-slide">&#10094;</button>
        <button class="slider-arrow next" id="next-slide">&#10095;</button>
    <?php endif; ?>
</div>