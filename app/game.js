function get_hand_state(hand){




}


function get_dupes(hand){
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
