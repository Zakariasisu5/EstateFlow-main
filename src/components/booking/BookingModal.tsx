import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Property } from "@/data/dummyProperties";
import { Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const BookingModal = ({ property, open, onClose }: BookingModalProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (date && selectedTime) {
      setIsConfirmed(true);
      toast.success(t("booking.bookingSuccess"));
      setTimeout(() => {
        setIsConfirmed(false);
        onClose();
      }, 2000);
    }
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("booking.bookTour")}</DialogTitle>
          <p className="text-muted-foreground">{property.title}</p>
        </DialogHeader>

        {!isConfirmed ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{t("booking.selectDate")}</h3>
              </div>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border pointer-events-auto"
                />
              </div>
            </div>

            {date && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{t("booking.selectTime")}</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="rounded-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {date && selectedTime && (
              <div className="pt-4 border-t animate-fade-in">
                <Button
                  onClick={handleConfirm}
                  size="lg"
                  className="w-full rounded-full bg-success hover:bg-success/90"
                >
                  {t("booking.confirmBooking")}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center animate-scale-in">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t("booking.tourBooked")}</h3>
            <p className="text-muted-foreground">
              {t("booking.tourScheduled", { date: date?.toLocaleDateString(), time: selectedTime })}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
