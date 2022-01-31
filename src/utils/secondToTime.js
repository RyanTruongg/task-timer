export default function secondsToTime(time) {
  const hours = parseInt(time / 3600);
  const minutes = parseInt(time / 60) % 60;
  const seconds = parseInt(time % 60);

  const timeStringArr = [hours, minutes, seconds].map((e) =>
    e < 10 ? "0" + e : "" + e
  );

  return timeStringArr.join(":");
}
