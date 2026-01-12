function get_hand_state(hand){
let hand_state = [0, hand[4]];
console.log("test");
for(let i = 0; i < hand.length; i++)
{
  console.log(hand[i]);
  let card_num = hand[i];
  let card_info = get_card_info(card_num);

  let flush = 0;
  let straight = 0;

  let dupe_list = check_dupes(hand);
  if(i == 0)
  {
    for(let iterator = 1; iterator < 5; iterator++)
    {
      let check_card = get_card_info(hand[iterator]);

      if(check_card[0] == card_info[0] + iterator)
        {
          straight = check_card[0]
          if(check_card[1] == card_info[1])
            {
              flush = check_card[0]
            }
          else
            {
              flush = 0;
            }
        }
      else
        {
          straight = 0;
          flush = 0;
        }
    }
  }

  num_dupes = len(dupe_list);

  if(straight != 0)
    {
      hand_state[1] = straight;
      hand_state[0] = 4;
    }

  if(flush != 0)
    {
      hand_state[1] = flush;

      if(straight != 0)
      {
        if(flush == 11)
          {
            hand_state[0] = 9
          }
        else
          {
            hand_state[0] = 8;
          }
      }
      else
        {
          hand_state[0] = 5;
        }
    }


}



}


function check_dupes(hand){
let dupe_list = {};

for(let i = 0; i < hand.length; i++)
{
  if(hand[i] in dupe_list)
    {
      dupe_list[hand[i]]+= 1;
    }
  else
    {
      dupe_list[hand[i]] = 1;
    }
}

for(let i  = 0; i < hand.length;i++)
{
  if(dupe_list[hand[i]] == 1)
    {
      delete dupe_list[hand[i]]
    }
}
  return dupe_list;
}

function get_card_info(card_num)
{
  return [card_num % 13, Math.floor(card_num / 13)];
}
