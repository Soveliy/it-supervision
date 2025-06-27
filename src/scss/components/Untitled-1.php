<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>
<?
global $basket;

if (!empty($arResult["CATEGORIES"]) && $arResult['CATEGORIES_ITEMS_EXISTS']): ?>
  <!-- Вывод поиска по устройствам -->
  <? if ($arResult['SEARCH_DEVICE']) { ?>
    <div class="live-search__item live-search__item--title test123123">
      Поиск по категориям устройств
    </div>
    <div class="live-search__item live-searchCat">
    </div>
    <? foreach ($arResult['SEARCH_DEVICE'] as $key => $el) { ?>
      <div class="live-search-item">
        <div class="live-searchCat__row ">
          <a class="live-searchCat__image" href="<?= $el["DETAIL_PAGE_URL"] ?>">
            <img class="icon-device" src="<?= $el["DEVICE_IMG"] ? $el["DEVICE_IMG"] : "/local/templates/new/images/noimage.jpg" ?>" alt="<?= $el['PRODUCT'] ?>">
          </a>
          <div class="live-searchCat__right">
            <div class="live-searchCat__head">
              <div class="live-searchCat__name">
                <?
                $query = str_replace(" ", "|", $arResult['query']);
                $name = preg_replace("/(" . $query . ")/iu", '<b>$0</b>', $el["VALUE"]);
                ?>
                <?= $name ?>
              </div>
              <a href="<?= $el["DETAIL_PAGE_URL"] ?>" class="live-searchCat__btn"> Все товары</a>
            </div>

            <? if ($el['SEARCH_DEVICE_SECTIONS']) {

              $count = 0; ?>

              <? global $USER;
              if ($USER->IsAdmin()) { ?>
                <?php
                $visibleSectionsCount = 5;
                $sections = $el['SEARCH_DEVICE_SECTIONS'];
                $hiddenCount = count($sections) - $visibleSectionsCount;
                $hasMore = $hiddenCount > 0;
                $uid = uniqid('sect_'); 
                ?>
                <ul class="live-searchCat__list tes1" data-toggle-block="<?= $uid ?>">
                  <? foreach ($sections as $i => $sect): ?>
                    <li class="<?= $i >= $visibleSectionsCount ? 'hidden-section' : '' ?>">
                      <a href="<?= $sect['URL'] . "filter/sovmestim_s_modelyu-is-" . $el["XML_ID"] . "/apply/" ?>">
                        <?= $sect['NAME'] ?>
                      </a>
                    </li>
                  <? endforeach; ?>
                </ul>
                <? if ($hasMore) { ?>
                  <button class="show-more-sections" data-toggle-btn="<?= $uid ?>" data-hidden-count="<?= $hiddenCount ?>">
                    Показать ещё <?= $hiddenCount ?>
                  </button>
                <? } ?>
              <? } else { ?>
                <ul class="live-searchCat__list tes1">
                  <? foreach ($el['SEARCH_DEVICE_SECTIONS'] as $sect) { ?>
                    <li><a href="<?= $sect['URL'] . "filter/sovmestim_s_modelyu-is-" . $el["XML_ID"] . "/apply/" ?>"><?= $sect['NAME'] ?></a></li>
                  <? } ?>
                </ul>
              <? } ?>



            <? } ?>

          </div>

        </div>
      </div>
    <? } ?>
    </div>
  <? } ?>
<? endif;
?>
<? if (!empty($arResult['SEARCH_RESULT']['SECTIONS'])): ?>
  <div class="live-search__item live-search__item--title">
    Поиск в категориях
    <? foreach ($arResult['SEARCH_RESULT']['SECTIONS'] as $sect): ?>
      <div class="live-search__item live-search__item--card">
        <a href="<?= $sect['URL'] ?>" class="live-search-item live-search-item--category">
          <span class="live-search-item__name">
            <?= $arResult['query'] ?> <span>в категории:</span> <?= $sect['NAME'] ?>
          </span>

        </a>
      </div>
    <? endforeach; ?>
  <? endif; ?>
  <? if (!empty($arResult['SEARCH_RESULT']['ELEMENTS'])): ?>
    <div data="hs" class="live-search__item live-search__item--title">
      Поиск в товарах
    </div>
    <?

    foreach ($arResult['SEARCH_RESULT']['ELEMENTS'] as $elem):
      $elem['PRICE'] = str_replace(' ', '', $elem['PRICE']);
      $elem['PRICE'] = str_replace(',', '.', $elem['PRICE']);
      $added = '';
      if (isset($basket[$elem['ID']]))
        $added = 'added';
    ?>
      <div class="live-search__item live-search__item--card" data-actual-id="<?= $elem['ID'] ?>" data-card="search">
        <div class="live-search-item">

          <div class="live-search-item__row">
            <input hidden data-quantity-field value="1">
            <a href="<?= $elem['URL'] ?>" class="live-search-item__image">
              <img src="<?= $elem['IMAGE'] ?>" alt="<?= $elem['PRODUCT'] ?>">
            </a>
            <div class="live-search-item__right">
              <a href="<?= $elem['URL'] ?>" class="live-search-item__name">
                <?= $elem['NAME'] ?>
              </a>
              <div class="live-search-item__payment payment-live-search">
                <span class="live-search-item__value"><?= number_format(floatval($elem['PRICE']), 0, '', ' '); ?> ₽</span>
                <? if (!$arResult['IS_HIDE_CLUB_PRICE']) { ?>
                  <span abbr data-tippy="Клубная цена" class="payment-live-search__club club-live-search data-tippy">
                    <svg xmlns="http://www.w3.org/2000/svg&quot; xml:space=" preserve" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24">
                      <path fill="gray" fill-rule="nonzero" d="M23.8 9.2 18.92 2c-.21-.32-.6-.5-.93-.5H5.93c-.33 0-.68.18-.9.5L.2 9.2c-.3.44-.25 1.02.11 1.4l10.85 11.56a1.13 1.13 0 0 0 1.64 0L23.69 10.6c.36-.38.4-.96.11-1.4Zm-5.88-4.68L20.9 9h-6.58l3.6-4.48Zm-5.94 3.86L8.3 3.74h7.35l-3.67 4.64ZM6.04 4.52 9.6 9H3.02l3.02-4.48Zm5.94 15.22-8-8.5h16l-8 8.5Z" />
                    </svg>
                    <div class="club-live-search__value">
                      <?= $elem['PRICE_BLUR']['RESULT_PRICE']["PRINT_PRICE"] ?>
                    </div>
                  </span>
                <? } ?>
              </div>

            </div>
            <button type="button" class="live-search-item__button <?= $added ?>" <? echo ($added) ?  'data-delete-product' : 'data-basket-add' ?> <? echo ($elem['CAN_BUY']) ?  '' : 'disabled' ?>>
              <i class="fa-light fa-cart-plus"></i>
            </button>
            <div class="preview-item__counter-wrap" data-buy="" style="display:none">
              <div class="counter preview-item__counter" data-counter-block="">
                <button class="counter__button counter__button--minus">-</button>
                <input data-quantity-field="" type="text" class="counter__input" value="1" data-max-count="1109">
                <button class="counter__button counter__button--plus">+</button>
              </div>
              <button data-basket-add="" class="preview-item__addToCart button button--size-medium button--default">В корзину</button>
            </div>
          </div>
        </div>
      </div>
    <? endforeach; ?>
  <? endif; ?>
