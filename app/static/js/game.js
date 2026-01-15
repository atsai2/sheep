function setup(){
  ctx.beginPath() //table
  ctx.ellipse(500, 220, 400, 200, 0, 0, 2 * Math.PI) //DRAWS POKER TABLE
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(75, 425, 50, 0, Math.PI * 2, true); //DRAWS BUTTON
  ctx.fillStyle = "#A3F0A3";
  ctx.fill()

  const poker_table = document.getElementById("poker_table")
  ctx.drawImage(poker_table, 10, 10, 80, 80)
}

function change_button(){
  ctx.beginPath()
  ctx.arc(75, 425, 50, 0, Math.PI * 2, true);
  ctx.fillStyle = "green";
  ctx.fill()
}


//RUNNING CODE

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

setup()

canvas.addEventListener('click', function(event) {
  console.log(event.clientX, event.clientY)
  change_button()
})




// POKER LOGIC BELOW

function compare_hands(hand1, hand2, state1, state2)
{
  if(state1[0] > state2[0])
    {
      return 1;
    }
  if(state1[0] < state2[0])
    {
      return -1;
    }
  if(state1[0] == state2[0])
    {
      if(state1[1] > state2[1])
        {
          return 1;
        }
      if(state1[1] < state2[1])
        {
          return -1;
        }
      if(state1[1] == state2[1])
        {
          for(let i = 0; i < hand1.length; i++)
          {
            if(hand1[i][0] > hand2[i][0])
              {
                return 1;
              }
            if(hand1[i][0] < hand2[i][0])
              {
                return -1;
              }
          }

        }
    }

  return 0;
}

function hand_to_imgs(hand,state)
{
  let suits = ["C","D","H","S"];
  let card_nums = ["A","2","3","4","5","6","7","8","9","T","J","Q","K"];

  let cards = "";
  for(let i = 0; i < hand.length; i++)
  {
    let img = card_nums[hand[i][0]] + suits[hand[i][1]];

    let img_link = "../static/image/" + img + ".png";
    if(state == "bot")
    {
      img_link = "../static/image/yellow_back.png"
    }
    cards += "<img class='scale-50 w-[300px]' src = '" + img_link + "'>";
  }

  return cards;
}

function bot_redraw(hand, in_state, deck)
{
  let temp_arr = in_state;

  let to_redraw = [];

  for(let i = 0; i < hand.length;i++)
  {
    let is_in_state = 0;

    if(temp_arr.includes(hand[i][0]))
      {
        is_in_state = 1;
      }
    if(is_in_state == 0)
      {
        to_redraw.push(i);
      }
  }

  for(let i = 0; i < to_redraw.length;i++)
  {
    redraw(hand, deck, i);
  }
}


function draw_hand(deck)
{
  let hand = [];
  for(let i = 0; i < 5; i++)
  {
    draw_card(hand, deck)
  }
  return hand;
}

function draw_card(hand, deck)
{
  hand.push(deck[deck.length - 1]);
  deck.pop();
  hand.sort(sort_hand);
}

function redraw(hand, deck, index)
{
  hand.splice(index, 1);
  draw_card(hand,deck);
}


function make_deck()
{
  let deck = [];

  for(let i = 0; i < 52; i++)
  {
    deck.push(get_card_info(i));
  }

  shuffle(deck);
  return deck;
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function get_hand_state(hand, in_state)
{
  hand = hand.sort(sort_hand);
  in_state = [];
  // print_2d(hand);

  let hand_state = [0,hand[4][0]];

  let straight = 0;
  let flush = 0;

  for(let i = 1; i < hand.length; i++)
  {
    if(straight >= 0 && hand[i][0] == hand[0][0] + i) // Checks if sequential
    {
      straight = hand[i][0];
    }
    else
    {
      straight = -1;
    }

    if(flush >= 0 && hand[i][1] == hand[0][1]) // Checks if same suit
    {
      flush = hand[i][0];
    }
    else
    {
      flush = -1;
    }
  }

  let dupe_dict = check_dupes(hand);
  let dupe_list = dict_to_2d(dupe_dict);
  dupe_list = dupe_list.sort(sort_dupes);
  //print_2d(dupe_list);

  let num_dupes = dupe_list.length;

  if(num_dupes > 0)
  {
    hand_state[1] = Number(dupe_list[num_dupes - 1][0]);
    let sum = 0;
    for(let i = 0; i < num_dupes; i++)
    {
      sum += dupe_list[i][1];
      for(let n = 0; n < dupe_list[i][1]; n++)
      {
        in_state.push(Number(dupe_list[i][0]));
      }
    }
    if(num_dupes == 1)
    {
      if(sum == 2)
      {
        hand_state[0] = 1;
      }
      if(sum == 3)
      {
        hand_state[0] = 3;
      }
      if(sum == 4)
      {
        hand_state[0] = 7;
      }
    }
    if(num_dupes == 2)
    {
      if(sum == 4)
      {
        hand_state[0] = 2;
      }
      if(sum == 5)
      {
        hand_state[0] = 6;
      }
    }
  }

  if(straight > 0)
  {
    for(let n = 0; n < hand.length; n++){in_state.push(info_to_num(hand[n]));}
    hand_state[1] = straight;
    hand_state[0] = 4;
  }

  if(flush > 0)
  {
    for(let n = 0; n < hand.length; n++){in_state.push(info_to_num(hand[n]));}
    hand_state[1] = flush;

    if(hand_state[0] < 5){hand_state[0] = 5;}
    if(straight > 0)
    {
      if(flush == 12)
      {
        hand_state[0] = 9;
      }
      else
      {
        hand_state[0] = 8;
      }
    }
  }

  if(hand_state[0] == 0){in_state.push(hand_state[1]);}
  //console.log("In State: " + in_state + "yeah");
  return [hand_state, in_state];
}

function check_dupes(hand)
{
  let dupe_list = {};

  for(let i = 0; i < hand.length; i++)
  {
    if(hand[i][0] in dupe_list)
    {
      dupe_list[hand[i][0]]++;
    }
    else
    {
      dupe_list[hand[i][0]] = 1;
    }
  }

  for(let i = 0; i < hand.length;i++)
  {
    if(dupe_list[hand[i][0]] == 1)
    {
      delete dupe_list[hand[i][0]];
    }
  }

  return dupe_list;
}

function dict_to_2d(dict)
{
  let final_list = [];

  let keys = Object.keys(dict);

  for(let i = 0; i < keys.length; i++)
  {
    final_list.push([keys[i],dict[keys[i]]]);
  }

  return final_list;
}

function sort_hand(x, y)
{
  if(x[0] == y[0])
    {
      return 0;
    }
    else
      {
        return (x[0] < y[0]) ? -1 : 1;
      }
}

function sort_dupes(x, y)
{
  if(x[1] == y[1])
    {
      return 0;
    }
    else
      {
        return (x[1] < y[1]) ? -1 : 1;
      }
}

function get_val(card_num)
{
  let card_info = get_card_info(card_num);
  return card_info[0];
}

function get_suit(card_num)
{
  let card_info = get_card_info(card_num);
  return card_info[1];
}

function print_2d(arr)
{
  for(let i = 0; i < arr.length; i++)
  {
    console.log(arr[i]);
  }
}

function get_card_info(card_num)
{
  return [card_num % 13, Math.floor(card_num / 13)];
}

function info_to_num(card_info)
{
  return (card_info[1] * 13) + card_info[0];
}
