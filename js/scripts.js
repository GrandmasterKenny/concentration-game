var bgImgDir, bgImgs, checkMatch, chooseCard, deck, isMatched, no1, no2, no3, noArr, randomBackground, removeMatch, shuffle, yes1, yes2, yes3, yesArr;
bgImgDir = "img/bgs/";
bgImgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];
yes1 = new Audio("snd/yes-1.mp3");
yes2 = new Audio("snd/yes-2.mp3");
yes3 = new Audio("snd/yes-3.mp3");
no1 = new Audio("snd/no-1.mp3");
no2 = new Audio("snd/no-2.mp3");
no3 = new Audio("snd/no-3.mp3");
yesArr = [yes1, yes2, yes3];
noArr = [no1, no2, no3];

// sloppy
deck = [
  "ice-king", "ice-king", 
  "finn", "finn", 
  "bmo", "bmo", 
  "jake", "jake", 
  "lumpy-space-princess", "lumpy-space-princess", 
  "princess-bubblegum", "princess-bubblegum"
];

// funcs
randomBackground = function(bgImgDir, bgImgArray)
{
  var bgSrc;
  bgSrc = bgImgDir + bgImgArray[Math.floor(Math.random() * bgImgArray.length)];
  return $("html").css("background-image", "url(" + bgSrc + ")");
};
shuffle = function()
{
  return 0.5 - Math.random();
};
chooseCard = function()
{
  if ($(".flipped").size() > 1)
  {
    return;
  }
  $(this).addClass("flipped");
  if ($(".flipped").size() === 2)
  {
    return setTimeout(checkMatch, 700);
  }
};
checkMatch = function()
{
  if (isMatched())
  {
    $(".flipped").removeClass("flipped").addClass("removed");
    $(".removed").bind("webkitTransitionEnd", removeMatch);
    return yesArr[Math.floor(Math.random() * yesArr.length)].play();
  }
  else
  {
    $(".flipped").removeClass("flipped");
    return noArr[Math.floor(Math.random() * noArr.length)].play();
  }
};
isMatched = function()
{
  var card1, card2, cards;
  cards = $(".flipped");
  card1 = $(cards[0]).data("pattern");
  card2 = $(cards[1]).data("pattern");
  return card1 === card2;
};
removeMatch = function()
{
  $(".removed").remove();
  if ($(".card").size() === 0)
  {
    return setTimeout((function()
    {
      return location.reload();
    }), 2000);
  }
};
// do some stuff
$(function()
{
  var i;
  randomBackground(bgImgDir, bgImgs);
  deck.sort(shuffle);
  i = 0;
  while (i < deck.length - 1)
  {
    $(".card:first-child").clone().appendTo("#cards");
    i++;
  }
  return $("#cards").children().each(function(index)
  {
    var pattern;
    $(this).css(
    {
      left: ($(this).width() + 20) * (index % 4),
      top: ($(this).height() + 20) * Math.floor(index / 4)
    });
    pattern = deck.pop();
    $(this).find(".front").addClass(pattern);
    $(this).data("pattern", pattern);
    return $(this).click(chooseCard);
  });
});